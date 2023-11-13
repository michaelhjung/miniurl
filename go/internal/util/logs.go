package util

import (
	"fmt"
	"log"
)

/*
FatalOnError checks for an error (which should always be the last argument) and logs fatal messages if that error is non-nil.
The function supports additional formatting in the formattedStr using standard fmt package verbs, and these format specifiers can be matched with additional arguments.

IMPORTANT:
- The error should always be the LAST argument.
- If no error is passed, or if the last argument isn't of type error or nil, the function will panic.

USE CASE EXAMPLES:

 1. Simple error check:
    FatalOnError("Failed to process data", err)

 2. With additional formatting:
    FatalOnError("Failed while processing value %s", "example", err)
    --> Result: "Failed while processing value example: [Error message here]"

 3. Misuse (will cause a panic):
    FatalOnError("This will cause a panic", "example")
    --> Panic: "Last argument to FatalOnError is not an error"
*/
func FatalOnError(formattedStr string, val ...interface{}) {
	// Check if any argument is passed
	if len(val) == 0 {
		panic("FatalOnError called without an error argument")
	}

	// Ensure the last argument is of type error or nil
	err, isErr := val[len(val)-1].(error)
	if !isErr && val[len(val)-1] != nil {
		panic("Last argument to FatalOnError is not an error")
	}

	// Log if there's an actual error (non-nil)
	if err != nil {
		newFormat := fmt.Sprintf("%s ==> %%w", formattedStr)
		log.Fatalf(newFormat, append(val[:len(val)-1], err)...)
	}
}
