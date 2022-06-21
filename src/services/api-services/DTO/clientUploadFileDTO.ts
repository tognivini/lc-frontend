interface ISaveClientFileBody {
  file: File
}

export interface ISaveClientFile {
  clientId: string
  typeClientFile: string
  body: ISaveClientFileBody
  onProgress?: (progress: number) => void
  cancelToken: any
}
