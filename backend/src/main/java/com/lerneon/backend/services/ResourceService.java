package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;
import com.lerneon.backend.models.payload.request.UpdateResourceOrderNumberRequest;

public interface ResourceService {

    Resource findResourceById(Integer id);

    void createResource(ResourceRequest resourceRequest);

    Resource updateResource(Integer id, ResourceRequest resourceRequest);

    void updateResourceOrderNumber(Integer id, UpdateResourceOrderNumberRequest updateResourceOrderNumberRequest);

    Resource deleteResource(Integer id);

    Resource activateResource(Integer id);
}
