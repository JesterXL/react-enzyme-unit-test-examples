import { Success, Failure } from 'folktale/validation';
import {
    nonEmptyString,
    stringIsAtLeast1Character,
    stringIs255CharactersOrLess,
    notAllBlankStrings,
    legitEmail,
    passwordIsNotBlank,
    passwordIsAtLeast14Characters,
    passwordIsNotAllBlanks
} from './predicates'
import { stubFalse, stubTrue, isString } from 'lodash/fp'

export const validNonEmptyString = o =>
    nonEmptyString(o)
        ? Success(o)
        : Failure([`Empty strings aren't allowed.`]);

export const validNameMinimumLength = o =>
    stringIsAtLeast1Character(o)
        ? Success(o)
        : Failure([
              `Username needs to be at least 1 character.`
          ]);

export const validNameMaximumLength = o =>
    stringIs255CharactersOrLess(o)
        ? Success(o)
        : Failure([
              `Username cannot be larger than 255 characters.`
          ]);

export const validNameNotBlankString = o =>
    notAllBlankStrings(o)
        ? Success(o)
        : Failure([
              `Cannot be a blank string.`
          ]);

export const validUsername = o =>
    validNonEmptyString(o)
        .concat(validNameMinimumLength(o))
        .concat(validNameMaximumLength(o))
        .concat(validNameNotBlankString(o));

export const validEmail = o =>
    legitEmail(o)
        ? Success(o)
        : Failure([
              `Invalid email address; it probably should be your firstname.lastname@capitalone.com .`
          ]);
    
const validPasswordIsNotOnlyBlanks = o =>
    passwordIsNotAllBlanks(o) ? Success(o)
          : Failure([`Password cannot be only blanks.`])

const safeLength = o => isString(o) ? o.length : 'not a string.'
const validPasswordLength = o =>
          passwordIsAtLeast14Characters(o) ? Success(o)
          : Failure([`Password must be at least 14 characters, yours is ${safeLength(o)}.`])

const validPasswordIsNotBlank = o =>
          passwordIsNotBlank(o) ? Success(o)
          : Failure([`Password cannot be empty.`])

export const validPassword = o =>
    validPasswordIsNotBlank(o)
    .concat(validPasswordLength(o))
    .concat(validPasswordIsNotOnlyBlanks(o))

export const isValid = validator =>
    validator.matchWith({
        Failure: stubFalse,
        Success: stubTrue
    });
