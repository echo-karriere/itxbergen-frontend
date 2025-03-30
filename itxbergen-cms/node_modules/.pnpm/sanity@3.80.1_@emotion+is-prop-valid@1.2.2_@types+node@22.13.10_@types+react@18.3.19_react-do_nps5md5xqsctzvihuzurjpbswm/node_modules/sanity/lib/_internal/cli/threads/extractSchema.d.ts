import {extractSchema} from '@sanity/schema/_internal'

/** @internal */
export declare interface ExtractSchemaWorkerData {
  workDir: string
  workspaceName?: string
  enforceRequiredFields?: boolean
  format: 'groq-type-nodes' | string
}

/** @internal */
export declare interface ExtractSchemaWorkerResult {
  schema: ReturnType<typeof extractSchema>
}

export {}
