
package com.viettel.crm.rest.vm;

import java.util.Date;
import java.util.List;

import lombok.Data;

/**
 * PartyForm
 * @author TinhBV
 *
 */
@Data
public class PartyForm {
    private Long    partyOrganizationId;
    private String  code;
    private String  name;
    private Date    effectiveDate;
    private Long    parentId;
    private Long    type;
    private Long    documentId;
    private Date    foundingDate;
    private Date    foundingDateFrom;
    private Date    foundingDateTo;
    private Long    coordinatorId;
    private Long    secretaryId;
    private Long    authorizationId;
    private Long    isSignOutVoffice;
    private Long    deputySecretaryId;
    private Long    organizationId;
}
