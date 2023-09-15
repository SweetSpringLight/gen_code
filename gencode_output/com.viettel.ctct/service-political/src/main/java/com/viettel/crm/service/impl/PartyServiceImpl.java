
package com.viettel.crm.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.viettel.crm.repository.PartyRepository;
import com.viettel.crm.repository.dto.PartyDTO;
import com.viettel.crm.repository.impl.PartyRepositoryCustom;
import com.viettel.crm.repository.model.Party;
import com.viettel.crm.rest.vm.PartyForm;
import com.viettel.crm.service.PartyService;
import com.viettel.data.DataTableResults;
import com.viettel.utils.ObjectMapperUtils;

/**
 * Service Implementation for managing {@link Party}.
 * 
 * @author TinhBV
 */
@Service
public class PartyServiceImpl implements PartyService {
    @Autowired
    private PartyRepository partyRepository;
    @Autowired
    private PartyRepositoryCustom partyRepositoryCustom;

    /**
     * @see com.viettel.crm.service.PartyService#findAll
     */
    @Override
    public List<PartyDTO> findAll() {
        List<Party> list = partyRepository.findAll();
        return ObjectMapperUtils.mapAll(list, PartyDTO.class);
    }

    /**
     * @see com.viettel.crm.service.PartyService#findDetail
     */
    @Override
    public PartyDTO findDetail(Long partyOrganizationId) {
        Party party = partyRepository.findById(partyOrganizationId).orElse(null);
        if (party == null) {
            return null;
        }
        PartyDTO PartyDTO = ObjectMapperUtils.map(party, PartyDTO.class);
        
        return PartyDTO;
    }
    /**
     * @see com.viettel.crm.service.PartyService#findById
     */
    @Override
    public PartyDTO findById(Long partyOrganizationId) {
        Party party = partyRepository.findById(partyOrganizationId).orElse(null);
        if (party != null) {
            PartyDTO partyDTO = ObjectMapperUtils.map(party, PartyDTO.class);
            return partyDTO;
        }
        return null;
    }

    /**
     * @see com.viettel.crm.service.PartyService#save
     */
    @Override
    @Transactional
    public PartyDTO save(PartyDTO partyDTO) {
        Party party = ObjectMapperUtils.map(partyDTO, Party.class);
        party = partyRepository.save(party);
        return ObjectMapperUtils.map(party, PartyDTO.class);
    }

    /**
     * @see com.viettel.crm.service.PartyService#delete
     */
    @Override
    @Transactional
    public void delete(PartyDTO partyDTO) {
        Party party = ObjectMapperUtils.map(partyDTO, Party.class);
        partyRepository.delete(party);
    }

    /**
     * @see com.viettel.crm.service.PartyService#searchPartys
     */
    @Override
    public DataTableResults<PartyDTO> searchPartys(PartyForm form,
            HttpServletRequest req, boolean isExport) {
        return partyRepositoryCustom.searchPartys(form, req, isExport);
    }
    /*****************************************************************************/
    /*****************************************************************************/

}
