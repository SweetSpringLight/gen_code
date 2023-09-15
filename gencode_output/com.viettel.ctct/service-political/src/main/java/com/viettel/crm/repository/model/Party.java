
/*
* Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
* subject to license terms.
*/

package com.viettel.crm.repository.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/**
* @author d2tsoftware
* @since 02/08/2019
* @version 1.0
*/
@Entity
@Table(name = "party_organization")
@Data
public class Party {

    @Id
    @Column(name = "party_organization_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyOrganizationId;

    @Column(name = "code")
    private String  code;

    @Column(name = "name")
    private String  name;

    @Column(name = "effective_date")
    private Date    effectiveDate;

    @Column(name = "exprited_date")
    private Date    expritedDate;

    @Column(name = "parent_id")
    private Long    parentId;

    @Column(name = "type")
    private Long    type;

    @Column(name = "documentId")
    private Long    documentId;

    @Column(name = "founding_date")
    private Date    foundingDate;

    @Column(name = "org_code_path")
    private String  orgCodePath;

    @Column(name = "org_path")
    private String  orgPath;

    @Column(name = "coordinator_id")
    private Long    coordinatorId;

    @Column(name = "generate_order")
    private String  generateOrder;

    @Column(name = "secretary_id")
    private Long    secretaryId;

    @Column(name = "authorization_id")
    private Long    authorizationId;

    @Column(name = "is_sign_out_voffice")
    private Long    isSignOutVoffice;

    @Column(name = "deputy_secretary_id")
    private Long    deputySecretaryId;

    @Column(name = "deputy_secretary_code")
    private String  deputySecretaryCode;

    @Column(name = "deputy_secretary_show_sign_image")
    private Long    deputySecretaryShowSignImage;

    @Column(name = "co_chi_uy")
    private Long    coChiUy;

    @Column(name = "party_org_order")
    private Long    partyOrgOrder;
}
