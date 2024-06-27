import { CHOICES_INPUTS, CHOICES_OUTPUTS, EDID_LIST } from './options.js'


export function getActionDefinitions(self) {
	return {
		video_route: {
			name: 'Video Route',
			options: [
				{
					type: 'dropdown',
					id: 'input',
					label: 'Input',
					default: '1',
					choices: CHOICES_INPUTS,
				},
				{
					type: 'dropdown',
					id: 'output',
					label: 'To Output',
					default: '1',
					choices: CHOICES_OUTPUTS,
				},
			],
			callback: async (action) => {
				const cmd = `\rSET OUT${action.options.output} VS IN${action.options.input}\r`
				const sendBuf = Buffer.from(cmd, 'latin1')
		
				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())
		
				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			},
		},
		LCD_on_time: {
			name: 'LCD On Time',
			options: [
				{
					type: 'dropdown',
					id: 'time',
					label: 'Time',
					default: '0',
					choices: [
						{ id: '0', label: 'Always On' },
						{ id: '1', label: '15 seconds' },
						{ id: '2', label: '30 seconds' },
						{ id: '3', label: '60 seconds' },
					],
				},
			],
			callback: async (action) => {
				const cmd = `\rSET LCD ON T${action.options.time}\r`
				const sendBuf = Buffer.from(cmd, 'latin1')
		
				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())
		
				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			},
		},
		key_lock: {
			name: 'Key Lock',
			options: [
				{
					type: 'dropdown',
					id: 'state',
					label: 'State',
					default: 'Unlocked',
					choices: [
						{ id: 'ON', label: 'Locked' },
						{ id: 'OFF', label: 'Unlocked' },
					],
				},
			],
			callback: async (action) => {
				const cmd = `\rSET KEY LOCK ${action.options.state}\r`
				const sendBuf = Buffer.from(cmd, 'latin1')
		
				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())
		
				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			},
		},
		fan_speed: {
			name: 'Fan Speed',
			options: [
				{
					type: 'dropdown',
					id: 'speed',
					label: 'Speed',
					default: '0',
					choices: [
						{ id: '0', label: 'Auto' },
						{ id: '1', label: '1' },
						{ id: '2', label: '2' },
						{ id: '3', label: '3' },
						{ id: '4', label: '4' },
						{ id: '5', label: '5' },
						{ id: '6', label: '6' },
					],
				},
			],
			callback: async (action) => {
				const cmd = `\rSET FAN SPEED ${action.options.speed}\r`
				const sendBuf = Buffer.from(cmd, 'latin1')
		
				self.log('debug', 'sending to ' + self.config.host + ': ' + sendBuf.toString())
		
				if (self.socket !== undefined && self.socket.isConnected) {
					self.socket.send(sendBuf)
				} else {
					self.log('debug', 'Socket not connected :(')
				}
			},
		},
	}
}

// SET STA, Show Global System Status
// SET RST, Reset to Factory Defaults
// SET ADDR xx, System Reset to Reboot
// SET LCD ON Tx, Set LCD Remain On Time{x=[0~3](0=Always on, 1=15, 2=30, 3=60sec)}
// SET KEY LOCK ON, Set Key Lock On
// SET KEY LOCK OFF, Set Key Lock Off
// SET FAN SPEED x, Set Fan Speed x=0~6
// SET OUTx VS INy, Set Output x to Input y{x=[0~16](0=ALL), y=[1~16]}
// SET OUTx TP VIDEO, Set HDMI Output x Video Mode y{x=[0~16](0=ALL), y=[2,5](2=4K2KOnly, 5=ICT Mode)}
// SET OUTx TX PHY, Set HDMI Output x Power Mode y{x=[0~16](0=ALL), y=[0=Off, 1=On]}
// SET OUTx EXA ENy DIS, Set Ex-Audio Output x Enable/Disable{x=[0~16](0=ALL), y=[0=Enable, 1=Disable]}
// SET OUTx EXA PHY, Set Ex-Audio Delay Data y{x=[0~16](0=ALL), y=0~7(0=Bypass, 1~7=Various Delays)}
// SET EXAMX MODE y, Set Ex-Audio Matrix Mode{x=[0~16](0=ALL), y=[0=Bind to Output, 1=Bind to Input, 2=Matrix]}
// SET OUTx AS INy, Set Ex-Audio Output x to Input y{x=[0~16](0=ALL), y=[1~16]}
// SET OUTx EXA LVL y, Set Ex-Audio Output x Volume Level{x=[0~16](0=ALL), y=0~100}
// SET OUTx TP STREAM ON/OFF, Set HDMI Output x Stream ON/OFF{x=[0~16](0=ALL), y=[0=OFF, 1=ON]}
// SET OUTx TX STREAM ON/OFF, Set HDMI Output x Stream ON/OFF{x=[0~16](0=ALL), y=[0=OFF, 1=ON]}
// SET OUTx TP VID EDID y, Set HDMI Output x Video EDID y{x=[0~16](0=ALL), y=[0~32]}
// SET OUTx TX VIDEO, Set HDMI Output x Video Mode y{x=[0~16](0=ALL), y=[2,5](2=4K2KOnly, 5=ICT Mode)}
// SET OUTx TP VIDEO, Set HDMI Output x Video Mode y{x=[0~16](0=ALL), y=[2,5](2=4K2KOnly, 5=ICT Mode)}
// SET OUTx TP VIDEO, Set HDMI Output x Video Mode y{x=[0~16](0=ALL), y=[2,5](2=4K2KOnly, 5=ICT Mode)}
// SET OUTx EXA LVL y, Set Ex-Audio Output x Volume Level{x=[0~16](0=ALL), y=0~100}
// SET OUTx EXA PH, Set Ex-Audio Output x Volume Level{x=[0~16](0=ALL), y=0~100}
// SET OUTx TP STREAM ON/OFF, Set HDMI Output x Stream ON/OFF{x=[0~16](0=ALL), y=[0=OFF, 1=ON]}
// SET OUTx TX STREAM ON/OFF, Set HDMI Output x Stream ON/OFF{x=[0~16](0=ALL), y=[0=OFF, 1=ON]}
// SET OUTx TP AUDIO, Set HDMI Output x Audio Mode y{x=[0~16](0=ALL), y=[0=On, 1=Off]}
// SET OUTx EXA PH, Set Ex-Audio Output x Phase y{x=[0~16](0=ALL), y=[0=Normal, 1=Reverse]}
// SET OUTx EXA LVL, Set Ex-Audio Output x Volume Level{x=[0~16](0=ALL), y=0~100}
// SET OUTx VS INy, Set Output x to Input y{x=[0~16](0=ALL), y=[1~16]}
// SET OUTx EXA PH, Set Ex-Audio Output x Phase y{x=[0~16](0=ALL), y=[0=Normal, 1=Reverse]}
// SET OUTx TP VIDEO, Set HDMI Output x Video Mode y{x=[0~16](0=ALL), y=[2,5](2=4K2KOnly, 5=ICT Mode)}
// SET OUTx TX STREAM ON/OFF, Set HDMI Output x Stream ON/OFF{x=[0~16](0=ALL), y=[0=OFF, 1=ON]}

// INPUT SETUP
// SET INx EDID y, Set Input x EDID{x=[0~16](0=ALL), y=[0~32]}
// SET INx EDID CY OUTy HP, Copy HDMI Output y EDID To Input x(USER1 BUF){x=[0~16](0=ALL), y=[Odd Num]}
// SET INx EDID CY OUTy TP, Copy HDBT Output y EDID To Input x(USER1 BUF){x=[0~16](0=ALL), y=[1~16]}
// SET INx EDID Uy DATAz, Write EDID To User y Buffer of Input x{x=[0~16](0=ALL), y=[1~3]=[EDID Data]}
