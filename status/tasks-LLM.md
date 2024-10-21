# LLM Service

## Input
- User textual input
- User image input
- Code generated previously

## Output
- Code or error message

## Flow
1. Frontend calls LLM service
2. Prompt refinement: Get revised prompt
3. Call API (OpenAI): Get output
4. Output format check:
   - If not pass, recall API
   - Check if imported packages are available at previewer
   - Check if code can be compiled (create tmp file and do run test)
5. LLM service passes result to frontend

# Code Structure

```
class LLMService:
    def __init__(self, api_key: str, max_attempts: int = 10):
        self.api_key = api_key
        self.max_attempts = max_attempts
        openai.api_key = self.api_key

    def process_input(self, text_input: str, image_input: Optional[str], previous_code: Optional[str]) -> Dict[str, Any]:
        # Prompt refinement
        refined_prompt = self._refine_prompt(text_input, image_input, previous_code)
        
        for attempt in range(self.max_attempts):
            try:
                # Call API(OpenAI), get output
                output = self._call_api(refined_prompt)
                
                # Output format check
                if not self._check_output_format(output):
                    continue  # Skip to next iteration if format check fails

                # Check if imported packages are available
                if not self._check_imports(output):
                    continue  # Skip to next iteration if import check fails

                # Check if code can be compiled
                if not self._is_compilable(output):
                    continue  # Skip to next iteration if compilation fails

                # All checks passed
                return {
                    "success": True,
                    "code": output,
                    "error": None,
                    "attempts": attempt + 1
                }
                
            except Exception as e:
                if attempt == self.max_attempts - 1:
                    return {
                        "success": False,
                        "code": None,
                        "error": f"Failed after {self.max_attempts} attempts. Last error: {str(e)}",
                        "attempts": attempt + 1
                    }
        
        # Exhausted all attempts without success
        return {
            "success": False,
            "code": None,
            "error": f"Failed to generate valid code after {self.max_attempts} attempts.",
            "attempts": self.max_attempts
        }

    def _refine_prompt(self, text_input: str, image_input: Optional[str], previous_code: Optional[str]) -> str:
        refined_prompt = f"Generate compilable React component based on the following:\nText: {text_input}\n"
        if image_input:
            refined_prompt += f"Image: {image_input}\n"
        if previous_code:
            refined_prompt += f"Previous code: {previous_code}\n"
        refined_prompt += "Please generate valid, well-formatted, and compilable React code. Only use packages that are commonly available in a standard React environment."
        return refined_prompt

    def _call_api(self, refined_prompt: str) -> str:
        response = openai.Completion.create(
            engine="gpt-4o-mini",
            prompt=refined_prompt,
            max_tokens=1000
        )
        return response.choices[0].text.strip()

    def _check_output_format(self, output: str) -> bool:
        return "import React" in output and "export default" in output

    def _check_imports(self, code: str) -> bool:
        # TODO

    def _is_compilable(self, code: str) -> bool:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as temp_file:
            temp_file.write(code)
            temp_file_path = temp_file.name

        try:
            # Use 'npx babel' to check if the code is compilable
            result = subprocess.run(['npx', 'babel', temp_file_path, '--presets', '@babel/preset-react'],
                                    capture_output=True, text=True, check=True)
            return True
        except subprocess.CalledProcessError:
            return False
        finally:
            os.unlink(temp_file_path)
```