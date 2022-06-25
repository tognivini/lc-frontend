const routes = {
  LOGIN: '/api/auth/login',
  REFRESH_TOKEN: '/api/auth/refresh-token',
  LIST_USERS: '/api/users',
  CREATE_USER: '/api/users',

  EDIT_PERMISSION_GROUP: '/api/permission-group',
  LIST_PERMISSION_GROUP: '/api/permission-group',
  GET_PERMISSION_GROUP: '/api/permission-group',
  CREATE_PERMISSION_GROUP: '/api/permission-group',
  DELETE_PERMISSION_GROUP: '/api/permission-group',

  LIST_PERMISSIONS: '/api/permissions',

  // Visit rate
  GET_ALL_USERS: '/api/user',
  POST_EDIT_VISIT_RATE: '/api/visit/visit-rate/alter',
  GET_VISIT_FREQUENCY_EXPORT: '/api/visit/visit-rate/export/file',

  // Visit Data Base / checklists
  GET_CHECKLIST_B2B_VISIT: '/api/visit-data-base/checklist/b2b',
  CREATE_CHECKLIST_B2B_VISIT: '/api/visit-data-base/create-b2b/checklist',
  EDIT_CHECKLIST_B2B_VISIT: '/api/visit-data-base/edit-b2b/checklist',

  GET_CHECKLIST_NETWORK_VISIT: '/api/visit-data-base/checklist/rede',
  CREATE_CHECKLIST_NETWORK_VISIT: '/api/visit-data-base/create-rede/checklist',
  EDIT_CHECKLIST_NETWORK_VISIT: '/api/visit-data-base/edit-rede/checklist',

  CREATE_NETWORK_VISIT: '/api/visit-data-base/create-rede',
  GET_VISIT_DATABASE_REDE: '/api/visit-data-base/rede',
  EDIT_NETWORK_VISIT: '/api/visit-data-base/edit-rede',
  CREATE_VISIT_DATABASE_B2B: '/api/visit-data-base/create-b2b',
  CREATE_VISIT_DATABASE_B2B_CHECKLIST:
    '/api/visit-data-base/create-b2b/checklist',
  EDIT_VISIT_DATABASE_B2B: '/api/visit-data-base/edit-b2b',
  GET_VISIT_DATABASE_B2B: '/api/visit-data-base/b2b',

  // Schedules
  LIST_SCHEDULES: '/api/schedules',
  CREATE_SCHEDULE: '/api/schedules',
  LIST_SUGGESTIONS: '/api/schedules/suggestion/visit',
  INSERT_SUGGESTIONS: '/api/schedules/insert-suggestion',
  GET_LAST_SCHEDULES: '/api/schedules/last-visits',
  GET_NEXT_SCHEDULES: '/api/schedules/next-visits',
  EDIT_SCHEDULE: '/api/schedules',
  DELETE_SCHEDULE: '/api/schedules',
  SET_AS_ENDEND_SCHEDULE: '/api/schedules/update/ended-visit',
  SET_CHECK_IN: '/api/schedules/update/check_in',
  SET_CHECK_OUT: '/api/schedules/update/check_out',
  SET_CHECK_LIST: '/api/schedules/update/check_list',
  GET_POS_VISIT_REPORT_DATA_CONSULTANT:
    '/api/visit/pos-visit/report/$scheduleId',

  GET_NOTIFICATIONS: '/api/notifications',
  SET_NOTIFICATION_VIEWED: '/api/notifications/set-viewed',
  GET_NUM_NOTIFICATIONS_NOT_VIEWED: '/api/notifications/count-not-viewed',
  // notifications endpoints
  SEND_DEVICE_TOKEN: '/api/users/save-device',

  // action plan
  GET_ACTION_PLAN: '/api/actions-plans',
  POST_ACTION_PLAN: '/api/actions-plans',
  PATCH_ACTION_PLAN: '/api/actions-plans',
  DELETE_ACTION_PLAN: '/api/actions-plans',
  GET_ACTION_PLAN_BY_ID: '/api/actions-plans',
  CONCLUDED_ACTION_PLAN: '/api/actions-plans/concluded',
  CREATE_ACTION_PLAN_REPORT: '/api/actions-plans/report',
  PATCH_ACTION_PLAN_REPORT: '/api/actions-plans/report',
  DELETE_ACTION_PLAN_REPORT: '/api/actions-plans/report',
  CONCLUDED_ACTION_PLAN_REPORT: '/api/actions-plans/report/concluded',
  GET_ACTION_PLAN_DELAYED_CLIENT_BY_ID:
    '/api/actions-plans/check/delayed/client',

  // conflict map
  GET_CONFLICT_MAP_BY_CLIENT: '/api/conflict-map/posts',
  GET_CONFLICT_MAP_BY_CNPJ: '/api/conflict-map/prospect',

  // quality report
  POST_NEW_QUALITY_REPORT: '/api/quality/report',
  GET_QUALITY_REPORT: 'api/quality/report',
  GET_QUALITY_SCHEDULED_VISITS:
    'api/management-report-quality/scheduled-visits/',
  GET_QUALITY_VISITS_MADE: 'api/management-report-quality/visits-made/',
  GET_QUALITY_VISITS_IN_NUMBERS:
    'api/management-report-quality/visits-in-numbers/',
  GET_QUALITY_CONSULTANT: 'api/management-report-quality/data-consultant/',
  POST_QUALITY_EMAIL: '/api/quality/report/send-email',
  GET_QUALITY_PREVIEW: '/api/quality/report/preview',

  // ticket-management's
  TICKET_MANAGEMENT_LIST: '/api/ticket',
  TICKET_MANAGEMENT_ATTENDANT_TRAINING_CREATE: '/api/ticket/attendant-training',
  TICKET_MANAGEMENT_CLIENT_DAY_CREATE: '/api/ticket/client-day',
  TICKET_MANAGEMENT_AUDIT_REQUEST_CREATE: '/api/ticket/audit-request',
  TICKET_MANAGEMENT_CONTAMINATION_WARNING_CREATE:
    '/api/ticket/contamination-warning',
  TICKET_MANAGEMENT_PROSPECTION_VISIT_BB_CREATE:
    '/api/ticket/prospection-visits-bb',
  TICKET_MANAGEMENT_QUALITY_PROBLEM_CREATE: '/api/ticket/quality-problem',
  TICKET_MANAGEMENT_VISITS_B2B_CREATE: '/api/ticket/visits-b2b',
  GET_LAST_QUALITY_VISITS: '/api/quality/last-visits',
  FINALIZE_TICKET: '/api/ticket/finalize',
  APPROVE_TICKET: '/api/ticket/approve',
  REPROVE_TICKET: '/api/ticket/reprove',
  CREATE_TICKET: '/api/ticket/create',

  // profile
  GET_PROFILE_SIGNATURE: 'api/users/signature',
  POST_PROFILE_SIGNATURE: 'api/users/signature',

  GET_STRATEGIC_PROFILE_BR: 'api/strategic-profile/information-br',
  GET_STRATEGIC_PROFILE_BB: 'api/strategic-profile/information-bb',

  // start prospect
  GET_PROPOSES: 'api/new-business/proposal',
  CREATE_PROSPECT_DATABASE: 'api/new-business/prospect/database-rodoil',
  CREATE_PROSPECTS: 'api/new-business/prospect',
  GET_BASE_LEADS: 'api/new-business/prospect-lead',
  GET_ANP_DETAILS: 'api/new-business/negotiation/{id}/anp',

  // udc
  UDC_AJUSTE: '/api/udc/ajuste',
  UDC_CATEGORIA04: '/api/udc/categoria04',
  UDC_CATEGORIA10: '/api/udc/categoria10',
  UDC_CATEGORIA11: '/api/udc/categoria11',
  UDC_CLASSE_CONTRIBUINTE: '/api/udc/classe_contribuinte',
  UDC_COD_ICMS: '/api/udc/cod_icms',
  UDC_COD_IPI: '/api/udc/cod_ipi',
  UDC_COND_PGTO: '/api/udc/cond_pgto',
  UDC_INSTRUMENTO_PGTO: '/api/udc/instrumento_pgto',
  UDC_NIVEL_VERFI_CREDITO: '/api/udc/nivel_verfi_credito',
  UDC_SUBSTIT_ICMS: '/api/udc/substit_icms',
  UDC_TIPO_REF_FATURAMENTO: '/api/udc/tipo_ref_faturamento',
  UDC_UNIDADE_NEGOCIO: '/api/udc/unidade_negocio',
  UDC_ZONA_FRANCA: '/api/udc/zona_franca',
  UDC_CODIGO_BASE: '/api/udc/codigo_base',
  UDC_CODIGO_FRETE: '/api/udc/codigo_frete',
  UDC_CODIGO_MOEDA: '/api/udc/codigo_moeda',
  UDC_CLASSIFICACAO_PROPRIEDADE: '/api/udc/classificacao_propriedade',
  UDC_IDIOMA: '/api/udc/idioma',
  UDC_TIPO_CONTRATO: '/api/udc/tipo_contrato',
  UDC_TIPO_FUNCAO: '/api/udc/tipo_funcao',
  UDC_ITEM: '/api/udc/item',
  UDC_BAIRROS: '/api/udc/bairro',
  UDC_PROGRAMACAO_AJUSTE: '/api/udc/programacao-ajuste',
  UDC_NUMERO_CADASTRO_RELACIONADO: '/api/udc/numero-cadastro-relacionado',
  EDIT_PROSPECTS: 'api/new-business/negotiation',
  CREATE_PRICE_FORMING: '/api/clients/pricing',
  EDIT_PRICE_FORMING: '/api/clients/pricing',
  DELETE_PRICE_FORMING: '/api/clients/pricing',

  CREATE_CLIENT_FREIGHT: '/api/clients/freight',
  EDIT_CLIENT_FREIGHT: '/api/clients/freight',
  DELETE_CLIENT_FREIGHT: '/api/clients/freight',

  CREATE_CLIENT_INVESTMENT: '/api/clients/investment',
  EDIT_CLIENT_INVESTMENT: '/api/clients/investment',
  DELETE_CLIENT_INVESTMENT: '/api/clients/investment',

  GET_CLIENT_EXPORT: '/api/clients/export/file',
  GET_CLIENT_CONTACTS_EXPORT: '/api/clients/export/contacts/file',

  GET_HISTORIC_DATA: 'api/new-business/proposal/:proposalId/history',

  REQUEST_CLIENT_COMERCIAL_APROVATION:
    '/api/clients/$clientId/request/approve/$sector',

  SEND_CLIENT_TO_JD: '/api/clients/integrate-jd/$clientId',

  // client file upload routes
  GET_PRE_VISIT_REPORT: '/api/visit/pre-visit/report',
  GET_CNPJ_INFOS: 'api/receita-federal/cnpj/$cnpj',
  POST_CLIENT_FILE: 'api/clients/$clientId/file/$typeClientFile',
  LIST_FILES_BY_CLIENTE_ID: 'api/clients/$clientId/file',
  UPDATE_CLIENT_FILE: 'api/clients/file/$clientFileId',
  DELETE_CLIENT_FILE: 'api/clients/file/$clientFileId',

  GET_FILE_DOWNLOAD: 'api/file/$fileId',

  GET_VIABILITY: '/api/new-business/proposal/',
  POST_VIABILITY: '/api/new-business/proposal/',

  GET_CLIENT_PRICING: 'api/clients/$clientId/pricing',
  GET_CLIENT_INVESTMENTS: '/api/clients/$clientId/investment',
  GET_CLIENT_FREIGHTS: '/api/clients/$clientId/freight',
  GET_CLIENT_CONTRACT_DATA: 'api/clients/$clientId/contract-data',
  GET_CLIENT_HISTORY: 'api/clients/history/?clientId=$clientId',

  UPDATE_CLIENT_SITUATION: 'api/clients/update-situation/$clientId'
}

export { routes }
