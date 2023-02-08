export const isAppManager = (priority: number) => {
  return priority < 2 || priority === 3;
}