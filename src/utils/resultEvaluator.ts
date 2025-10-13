import { Answers, ResultStatement } from '@/types/questionnaire';

/**
 * Evaluates which result statements should be shown based on user answers
 */
export const evaluateResults = (
  answers: Answers,
  resultStatements: ResultStatement[]
): ResultStatement[] => {
  return resultStatements.filter((statement) => {
    return evaluateConditions(statement.conditions, answers);
  });
};

/**
 * Evaluates conditions for a single result statement
 */
const evaluateConditions = (
  conditions: ResultStatement['conditions'],
  answers: Answers
): boolean => {
  // All top-level conditions must be met
  for (const condition of conditions) {
    if (!evaluateCondition(condition, answers)) {
      return false;
    }
  }
  return true;
};

/**
 * Evaluates a single condition
 */
const evaluateCondition = (
  condition: ResultStatement['conditions'][0],
  answers: Answers
): boolean => {
  const answer = answers[condition.questionId];

  // First check the main condition
  let mainConditionMet = false;

  switch (condition.operator) {
    case 'equals':
      mainConditionMet = answer === condition.value;
      break;

    case 'greaterThan':
      if (typeof answer === 'number' && typeof condition.value === 'number') {
        mainConditionMet = answer > condition.value;
      }
      break;

    case 'lessThan':
      if (typeof answer === 'number' && typeof condition.value === 'number') {
        mainConditionMet = answer < condition.value;
      }
      break;

    case 'includes':
      if (Array.isArray(condition.value)) {
        mainConditionMet = condition.value.includes(String(answer));
      }
      break;

    case 'and':
      mainConditionMet = true; // AND logic is handled by subConditions
      break;

    case 'or':
      mainConditionMet = true; // OR logic would need special handling
      break;

    default:
      mainConditionMet = false;
  }

  // If main condition isn't met, return false immediately
  if (!mainConditionMet) {
    return false;
  }

  // If there are sub-conditions, all must be met (AND logic)
  if (condition.subConditions && condition.subConditions.length > 0) {
    for (const subCondition of condition.subConditions) {
      const subAnswer = answers[subCondition.questionId];
      let subConditionMet = false;

      switch (subCondition.operator) {
        case 'equals':
          subConditionMet = subAnswer === subCondition.value;
          break;

        case 'greaterThan':
          if (typeof subAnswer === 'number' && typeof subCondition.value === 'number') {
            subConditionMet = subAnswer > subCondition.value;
          }
          break;

        case 'lessThan':
          if (typeof subAnswer === 'number' && typeof subCondition.value === 'number') {
            subConditionMet = subAnswer < subCondition.value;
          }
          break;

        case 'includes':
          if (Array.isArray(subCondition.value)) {
            subConditionMet = subCondition.value.includes(String(subAnswer));
          }
          break;

        default:
          subConditionMet = false;
      }

      // If any sub-condition fails, the whole condition fails
      if (!subConditionMet) {
        return false;
      }
    }
  }

  return true;
};
