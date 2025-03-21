/** @public */
export declare const ENV_FILE: {
  readonly TEMPLATE: '.env.template'
  readonly EXAMPLE: '.env.example'
  readonly LOCAL_EXAMPLE: '.env.local.example'
  readonly LOCAL_TEMPLATE: '.env.local.template'
}

/** @public */
export declare const ENV_TEMPLATE_FILES: readonly [
  '.env.template',
  '.env.example',
  '.env.local.example',
  '.env.local.template',
]

/** @public */
declare interface FileReader_2 {
  readFile(filePath: string): Promise<{
    exists: boolean
    content: string
  }>
  readDir(dirPath: string): Promise<string[]>
}
export {FileReader_2 as FileReader}

/** @public */
export declare function getMonoRepo(fileReader: FileReader_2): Promise<string[] | undefined>

/** @public */
export declare class GitHubFileReader implements FileReader_2 {
  private baseUrl
  private headers
  constructor(baseUrl: string, headers?: Record<string, string>)
  readFile(filePath: string): Promise<{
    exists: boolean
    content: string
  }>
  readDir(dirPath: string): Promise<string[]>
}

/** @public */
export declare class LocalFileReader implements FileReader_2 {
  private basePath
  constructor(basePath: string)
  readFile(filePath: string): Promise<{
    exists: boolean
    content: string
  }>
  readDir(dirPath: string): Promise<string[]>
}

/** @public */
export declare const REQUIRED_ENV_VAR: {
  readonly PROJECT_ID: RegExp
  readonly DATASET: RegExp
}

/** @public */
export declare function validateLocalTemplate(directory: string): Promise<ValidationResult>

/** @public */
export declare function validateRemoteTemplate(
  baseUrl: string,
  headers?: Record<string, string>,
): Promise<ValidationResult>

/** @public */
export declare function validateTemplate(
  fileReader: FileReader_2,
  packages?: string[],
): Promise<ValidationResult>

/** @public */
export declare type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export {}
