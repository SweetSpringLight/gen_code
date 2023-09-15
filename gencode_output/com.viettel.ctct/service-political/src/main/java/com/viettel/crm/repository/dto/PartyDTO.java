
/*
* Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
* subject to license terms.
*/

package com.viettel.crm.repository.dto;

import java.util.Date;

import lombok.Data;

/**
* @author d2tsoftware
* @since 02/08/2019
* @version 1.0
*/
@Data
public class PartyDTO {
    private Long    partyOrganizationId;
    private String  code;
    private String  name;
    private Date    effectiveDate;
    private Long    parentId;
    private String  parentName;
    private Long    type;
    private String  typeName;
    private Long    documentId;
    private String  documentName;
    private Long    coordinatorId;
    private String  coordinatorFullName;
    private String  coordinatorEmail;
    private Long    secretaryId;
    private String  secretaryFullName;
    private String  secretaryEmail;
    private Long    authorizationId;
    private String  authorizationFullName;
    private String  authorizationEmail;
    private Long    isSignOutVoffice;
    private Long    deputySecretaryId;
    private String  deputySecretaryFullName;
    private String  deputySecretaryEmail;
}

