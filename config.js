import { Regex } from '@companion-module/base'

const REGEX_IP_OR_HOST =
	'/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]).)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9]))$/'

export const ConfigFields = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: `This module will connect to AVProconnect AC-MX1616-AUHD.`,
	},
	{
		type: 'textinput',
		id: 'host',
		label: 'Target Host name or IP',
		width: 8,
		regex: REGEX_IP_OR_HOST,
	},
	{
		type: 'textinput',
		id: 'port',
		label: 'Target Port',
		width: 4,
		default: 23,
		regex: Regex.PORT,
	},
]
