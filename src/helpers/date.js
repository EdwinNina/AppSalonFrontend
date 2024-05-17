import { parse, formatISO, parseISO, format} from 'date-fns'
import es from 'date-fns/locale/es'

export const convertToISO = (date) => {
   const newDate = parse(date, 'dd/MM/yyyy', new Date())
   return formatISO(newDate)
}

export const displayDate = (date) => {
   return format(parseISO(date), 'PPPP', { locale: es })
}

export const convertToDDMMYYYY = (date) => {
   return format(parseISO(date), 'dd/MM/yyyy')
}