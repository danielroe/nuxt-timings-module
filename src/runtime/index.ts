import chalk from 'chalk'

export function sanitizeString (string: string) {
  return removeInvalidChars(string.replace(/\//g, '-'))
}

export function removeInvalidChars (string: string) {
  return string.replace(/(\/|:)/g, '-')
}

export function prettyTimer (method: 'time' | 'timeEnd', lifecycle: string, process: string, name: string) {
  console[method](`${chalk.greenBright(lifecycle.padEnd(10))} ${chalk.grey('>>')} ${process.padEnd(10)}  ${chalk.bold(removeInvalidChars(name).padEnd(30))}`)
}
