package com.lerneon.backend.services;

import java.util.List;

import com.lerneon.backend.models.entity.Resource;
import com.lerneon.backend.models.payload.request.ResourceRequest;

public interface ResourceService {

    Resource findResourceById(Integer id);

    Resource createResource(Integer moduleId, ResourceRequest resourceRequest);

    Resource updateResource(Integer id, ResourceRequest resourceRequest);

    Resource deleteResource(Integer id);

    List<Resource> bulkCreateResource(List<ResourceRequest> resourceRequests);
}
