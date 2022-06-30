# Edge Cases for Input Types

## String
- '' empty string
- too many spaces, needs to be cleaned up
  - '   hello world', 'hello world   ', 'hello    world'
    - this last one came up as an edge case in the code review, possibly solve with split() and trim()
- \n, \t, other whitespace to be cleaned up with trim()
- case: upper or lower
- special chars
- char requirements
  - only alphabet, only upper, only lower
  - only alphanumeric
  - only numbers
  - no spaces
  - etc.
- *any other edge cases to consider for special chars?*

## Number
- 0 zero
- `NaN`
- `Infinity`, `-Infinity`
- decimal numbers
- negative numbers
- 'string' numbers '1', '2', '3', etc.
- *any other edge cases to consider for special chars?*