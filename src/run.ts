import { runCommand as _runCommand, runMain as _runMain } from 'citty'

import { main } from './main'

export const runMain = () => _runMain(main)
