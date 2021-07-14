export interface IDepartment {
  MetaTagDescription: string
  children: IDepartment[]
  hasChildren: boolean
  id: number
  name: string
  url: string
}
