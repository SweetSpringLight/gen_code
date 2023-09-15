

/*
 * Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */

package com.viettel.crm.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.viettel.crm.repository.dto.PartyDTO;
import com.viettel.crm.rest.vm.PartyForm;
import com.viettel.data.DataTableResults;
import com.viettel.domain.RepositoryCustomUtils;
import com.viettel.utils.CommonUtils;

/**
* @author d2tsoftware
* @since 07/07/2022
* @version 1.0
*/
@Repository
public class PartyRepositoryCustom extends RepositoryCustomUtils {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
    /**
    * searchPartys
    *
    * @param form
    * @param req
    * @param isExport
    * @return
    */
    public DataTableResults<PartyDTO> searchPartys(PartyForm form, HttpServletRequest req, boolean isExport) {
        List<Object> paramList = new ArrayList<>();

        String sql = " SELECT ";
        sql += "         po.party_organization_id As partyOrganizationId ";
        sql += "        ,po.code As code ";
        sql += "        ,po.name As name ";
        sql += "        ,po.founding_date As foundingDate ";
        sql += "        ,po.organization_id As organizationId ";
        sql += "        ,po1.name As parentName ";
        sql += "        ,ct2.name As typeName ";
        sql += "        ,d3.name As documentName ";
        sql += "        ,e4.fullName As coordinatorFullName ";
        sql += "        ,e4.email As coordinatorEmail ";
        sql += "        ,e5.fullName As secretaryFullName ";
        sql += "        ,e5.email As secretaryEmail ";
        sql += "        ,e6.fullName As authorizationFullName ";
        sql += "        ,e6.email As authorizationEmail ";
        sql += "        ,e7.fullName As deputySecretaryFullName ";
        sql += "        ,e7.email As deputySecretaryEmail ";
        sql += "        ,o8.name As orgName ";
        sql += "       FROM party_organization po ";
        sql += "       LEFT JOIN party_organization po1 ON po1.party_organization_id = po.parent_id ";
        sql += "       INNER JOIN category_type ct2 ON ct2.category_type_id = po.type ";
        sql += "       LEFT JOIN document d3 ON d3.document_id = po.documentId ";
        sql += "       LEFT JOIN employee e4 ON e4.employee_id = po.coordinator_id ";
        sql += "       LEFT JOIN employee e5 ON e5.employee_id = po.secretary_id ";
        sql += "       LEFT JOIN employee e6 ON e6.employee_id = po.authorization_id ";
        sql += "       LEFT JOIN employee e7 ON e7.employee_id = po.deputy_secretary_id ";
        sql += "       LEFT JOIN orgainzation o8 ON o8.organization_id = po.organization_id ";
        StringBuilder strCondition = new StringBuilder(" WHERE 1 = 1  ");

        // search by code
        CommonUtils.filter(form.getCode(), strCondition, paramList, "po.code");

        // search by name
        CommonUtils.filter(form.getName(), strCondition, paramList, "po.name");

        // search by foundingDateFrom and foundingDateTo
        CommonUtils.filterFromTo(form.getFoundingDateFrom(), form.getFoundingDateTo(), strCondition, paramList, "po.founding_date");

        String orderBy = " ORDER BY po.party_organization_id DESC";
        if (!isExport) {
            return findPaginationQuery(req, sql + strCondition.toString(), orderBy, paramList, PartyDTO.class);
        }
        return findPaginationQuery(req, sql + strCondition.toString(), orderBy, paramList, PartyDTO.class,
                Integer.MAX_VALUE);
    }
}

