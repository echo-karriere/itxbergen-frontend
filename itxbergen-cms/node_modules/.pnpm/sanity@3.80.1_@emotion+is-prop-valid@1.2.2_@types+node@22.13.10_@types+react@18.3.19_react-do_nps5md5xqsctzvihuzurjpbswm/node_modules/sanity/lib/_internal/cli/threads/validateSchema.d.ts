import {SchemaValidationProblem} from '@sanity/types'
import {SchemaValidationProblemGroup} from '@sanity/types'

/** @internal */
export declare interface ValidateSchemaWorkerData {
  workDir: string
  workspace?: string
  level?: SchemaValidationProblem['severity']
}

/** @internal */
export declare interface ValidateSchemaWorkerResult {
  validation: SchemaValidationProblemGroup[]
}

export {}
