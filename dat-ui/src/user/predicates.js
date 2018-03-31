import { isString, every, negate} from  'lodash/fp'
import isemail from 'isemail'

export const nonEmptyString = o => isString(o) && o.length > 0 
const blankString = o => o === ' '
const emptyString = o => o === ''
const allBlanks = o => {
    if(isString(o) === false) {
        return false;
    }
    return emptyString(o) ? false : every(blankString, o.split(''))
}
    
export const notAllBlankStrings = negate(allBlanks)

export const stringIsAtLeast1Character = o => isString(o) && o.length > 0
export const stringIs255CharactersOrLess = o => isString(o) && o.length <= 255

export const legitEmail = o => nonEmptyString(o) && isemail.validate(o)

export const passwordIsNotBlank = nonEmptyString
export const passwordIsAtLeast14Characters = o => isString(o) && o.length >= 14
export const passwordIsNotAllBlanks = notAllBlankStrings