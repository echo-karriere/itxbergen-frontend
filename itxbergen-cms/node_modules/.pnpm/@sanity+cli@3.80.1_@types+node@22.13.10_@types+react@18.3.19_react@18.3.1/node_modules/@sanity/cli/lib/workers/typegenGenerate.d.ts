export declare interface TypegenGenerateTypesWorkerData {
  workDir: string
  workspaceName?: string
  schemaPath: string
  searchPath: string | string[]
  overloadClientMethods?: boolean
}

export declare type TypegenGenerateTypesWorkerMessage =
  | {
      type: 'error'
      error: Error
      fatal: boolean
      query?: string
      filename?: string
    }
  | {
      type: 'types'
      filename: string
      types: {
        queryName: string
        query: string
        type: string
        unknownTypeNodesGenerated: number
        typeNodesGenerated: number
        emptyUnionTypeNodesGenerated: number
      }[]
    }
  | {
      type: 'schema'
      filename: string
      schema: string
      length: number
    }
  | {
      type: 'typemap'
      typeMap: string
    }
  | {
      type: 'complete'
    }

export {}
