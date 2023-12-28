export async function conductInterviews(
  subjects: string[],
  interview: (subject: string) => Promise<string>,
  timeConstraint: number
): Promise<string[]> {
  const wait: Promise<never> = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeConstraint);
  });

  const interviewsPromises = subjects.map(subject => {
    return Promise.race<[Promise<never>, Promise<string>]>([wait, new Promise((resolve) => resolve(interview(subject)))])
  });

  const interviewResult = (await Promise.allSettled(interviewsPromises)).map((result: PromiseSettledResult<never | string>) => {    
    if ('value' in result) return result.value;
    if ('reason' in result) return result.reason.toString();
  });

  return interviewResult;
}
