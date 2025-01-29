export interface FetchComponentDefinitionResponse {
  definitions: Record<string, ComponentDefinition>
  features: ClientFeatures
  typeSupportPresets?: Record<string, any>
}

export interface ComponentDefinition {
  component: string
  name: string
  friendlyName?: string
  hasChildren?: boolean
  settings?: ComponentSetting[]
  features?: Record<string, boolean>
  legalDirectChildren: string[]
  illegalChildren: string[]
}

export interface ComponentSetting {
  key: string
  type: string
  section?: string
  name?: string
  defaultValue?: any
  selectAllFields?: boolean
  resetOn?: string | string[]
  settings?: ComponentSetting[]
}

export interface ClientFeatures {
  spectrumThemes: boolean
  intelligentLoading: boolean
  deviceAwareness: boolean
  state: boolean
  rowSelection: boolean
  customThemes: boolean
  devicePreview: boolean
  messagePassing: boolean
  continueIfAction: boolean
  showNotificationAction: boolean
  sidePanel: boolean
}
