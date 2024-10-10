# Requirements

1. User Input: The system accepts both text and image inputs.
2. Conversation Display: All user inputs are recorded and displayed as a conversation.
3. Code Generation: The application automatically generates code based on user input.
4. UI Preview: Users can see a real-time preview of their interface.
5. Code Modification: The generated code can be manually edited.
6. Input-Based Modification: Users can provide additional inputs to modify the UI.
7. Modification History: The system tracks all code modifications.
8. Input History: All user inputs and conversations are preserved, even after browser restarts.


# Specifications

1. Textual Input Area: user instructions and commands. (R1)
2. Image Upload Button: for sketch and style images. (R1) 
3. Conversation Log: display the user input history. (R2)
4. Input-to-Code LLM Service: interprets user input and generates or modifies code. (R3)
5. Code Editor: manual code modifications. (R5)
6. UI Previewer: real-time visualization of the interface. (R4)
7. Code Compiler: convert the editor code into a format renderable by the UI previewer. (R4)
8. Code Modification Synchronization: reflect changes in both the preview and code. (R6)
9. Persistence Mechanism: save user progress, including modifications and input history. (R7, R8)
