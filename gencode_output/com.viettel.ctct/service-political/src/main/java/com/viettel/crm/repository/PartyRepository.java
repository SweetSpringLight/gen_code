
/*
* Copyright (C) 2018 Viettel Telecom. All rights reserved. VIETTEL PROPRIETARY/CONFIDENTIAL. Use is
* subject to license terms.
*/

package com.viettel.crm.repository;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.viettel.crm.repository.model.Party;

/**
* @author d2tsoftware
* @since 02/08/2019
* @version 1.0
*/
@Repository
public interface PartyRepository extends CrudRepository<Party, Long   > {
   /**
    * List all Party
    */
    public List<Party> findAll();
}
