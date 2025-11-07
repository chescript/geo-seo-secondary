// Utility to break up long tasks by yielding to the browser
// This prevents blocking the main thread for >50ms

/**
 * Yields to the browser to allow it to process other tasks
 * Use this in loops or heavy computations to break up long tasks
 */
export function yieldToMain(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

/**
 * Runs tasks with yields between them to prevent blocking
 * @param tasks Array of functions to execute
 * @param yieldInterval How often to yield (default: every task)
 */
export async function runWithYields<T>(
  tasks: Array<() => T | Promise<T>>,
  yieldInterval = 1
): Promise<T[]> {
  const results: T[] = [];

  for (let i = 0; i < tasks.length; i++) {
    const result = await tasks[i]();
    results.push(result);

    // Yield to browser after every yieldInterval tasks
    if ((i + 1) % yieldInterval === 0) {
      await yieldToMain();
    }
  }

  return results;
}

/**
 * Use requestIdleCallback if available, fallback to setTimeout
 * Schedules work when browser is idle
 */
export function scheduleIdleWork(callback: () => void): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback);
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Chunk an array and process with yields
 * @param array Array to process
 * @param chunkSize Size of each chunk
 * @param processor Function to process each chunk
 */
export async function processInChunks<T, R>(
  array: T[],
  chunkSize: number,
  processor: (chunk: T[]) => R | Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    const result = await processor(chunk);
    results.push(result);

    // Yield to browser between chunks
    await yieldToMain();
  }

  return results;
}
