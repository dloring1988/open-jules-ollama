export class PlannerAgent {
  constructor(ollamaService, model) {
    this.ollamaService = ollamaService;
    this.model = model;
  }

  async generatePlan(task) {
    const systemPrompt = `You are a senior software engineer tasked with breaking down coding tasks into clear, actionable steps that will be used by another AI developer to implement the changes.

Your role is to:
1. Analyze the given task thoroughly.
2. Break it down into a logical, sequential series of technical steps. Focus on the technical requirements and the order of implementation.
3. For each step, provide detailed and specific information that an AI developer can use to write the code. This includes:
    a. Clearly identifying target file paths for new or modified files (e.g., \`src/components/NewComponent.js\` or \`backend/services/existingService.js\`).
    b. Specifying function or method details if new ones are to be created (e.g., \`function calculateTotalPrice(items, taxRate)\` or \`class User { constructor(id, name) }\`). Include parameters and expected return types where appropriate.
    c. Outlining the high-level logic or pseudo-code for new functions or modifications to existing ones.
    d. Mentioning any specific external libraries or modules if their use is anticipated for a particular step (e.g., "Use the 'axios' library for making HTTP requests").
4. Consider technical dependencies and requirements for each step.
5. Provide clear, implementable actions. Avoid vague descriptions.
6. Do not include any time estimates or deadlines for completing the tasks.

Return your response as a structured plan with numbered steps. Each step should be detailed enough for another AI to implement the technical changes.`;

    const prompt = `Task: ${task}

Please create a detailed technical implementation plan for this task. Break it down into clear, sequential steps that an AI developer can follow to implement the solution. For each step, provide the following details:
- Specific file paths for any files to be created or modified (e.g., \`src/components/NewComponent.js\`).
- For new functions or methods, suggest their names, parameters, and expected return types (e.g., \`function getUserData(userId: string): UserDetails\`).
- A high-level description of the logic or pseudo-code for the changes needed in that step.
- If applicable, mention any specific external libraries or modules that should be used (e.g., "Use 'date-fns' for date manipulations").
- The logical order of implementation, especially highlighting dependencies between steps.
- Any potential technical challenges or important considerations for that specific step.

Provide a numbered list of specific, actionable steps to complete this task. Ensure each step contains enough detail for another AI to implement the code changes.`;

    try {
      const response = await this.ollamaService.generateResponse(this.model, prompt, systemPrompt);
      return response.trim();
    } catch (error) {
      console.error('Planner Agent error:', error);
      throw new Error('Failed to generate implementation plan');
    }
  }
}