
/*
 * Copyright (C) 2022 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
 * subject to license terms.
 */
package com.viettel.crm.rest;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.viettel.crm.repository.dto.PartyDTO;
import com.viettel.crm.rest.vm.PartyForm;
import com.viettel.crm.service.PartyService;
import com.viettel.data.BaseController;
import com.viettel.data.Constants;
import com.viettel.data.Response;
import com.viettel.domain.PermissionChecker;
import com.viettel.exception.PermissionException;

/**
* @author d2tsoftware
* @since 02/08/2019
* @version 1.0
*/
@Controller
@RequestMapping("/v2/party-organizations")
public class PartyController extends BaseController {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    final String adResouceKey = "resouceCode.party";
    @Autowired
    PartyService partyService;
    @Autowired
    PermissionChecker permissionChecker;

    /**
    * Search partys by conditions
    *
    * @param form
    * @return DataTableResults
    * @throws PermissionException
    */
    @GetMapping(path = "/search")
    public @ResponseBody Response searchPartys(HttpServletRequest req, PartyForm form) throws PermissionException {
        if (!permissionChecker.hasPermission("action.view", adResouceKey, req)) {
            LOGGER.warn("PermissionInvalid");
            throw new PermissionException();
        }
        return Response.success().withData(partyService.searchPartys(form, req, false));
    }

    /**
    * Get one party by primary Id detail
    *
    * @param Long partyOrganizationId
    * @return DataTableResults
    * @throws PermissionException
    */
    @GetMapping(path = "/{partyOrganizationId}")
    private @ResponseBody Response findDetail(@PathVariable Long partyOrganizationId) {
        PartyDTO partyDTO = partyService.findDetail(partyOrganizationId);
        if (partyDTO == null) {
            return Response.warning(Constants.RESPONSE_CODE.RECORD_DELETED);
        }
        return Response.success().withData(partyDTO);
    }

}

