
package com.viettel.crm.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.viettel.crm.repository.dto.PartyDTO;
import com.viettel.crm.rest.vm.PartyForm;
import com.viettel.data.DataTableResults;


/**
 * Service Interface for managing {@link com.viettel.crm.repository.entities.Party}.
 * 
 * @author TinhBV
 */
public interface PartyService {

    /**
     * find all Party
     *
     * @return list persisted entity.
     */
    List<PartyDTO> findAll();

    /**
     * Save a Party.
     *
     * @param PartyDTO the entity to save.
     * @return the persisted entity.
     */
     PartyDTO save(PartyDTO partyDTO);
    /**
     * find one Party detail by id
     * @param partyId
     * @return
     */
     PartyDTO findDetail(Long partyId);
    /**
     * find one Party by id
     * @param partyId
     * @return
     */
     PartyDTO findById(Long partyId);

    /**
     * Delete a Party.
     *
     * @param partyDTO the entity to delete.
     */
    void delete(PartyDTO partyDTO);

    /**
     * Search Party list pagination
     * @param form
     * @param req
     * @param isExport
     * @return
     */
    DataTableResults<PartyDTO> searchPartys(PartyForm form, HttpServletRequest req,
            boolean isExport);


    /*************************************/
    /*************************************/

}
