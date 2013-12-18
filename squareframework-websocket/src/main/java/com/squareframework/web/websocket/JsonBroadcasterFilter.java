package com.squareframework.web.websocket;

import org.atmosphere.BroadcastFilterAdapter;
import org.atmosphere.cpr.BroadcastFilter.BroadcastAction.ACTION;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonBroadcasterFilter extends BroadcastFilterAdapter {

	private final ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public BroadcastAction filter(Object originalMessage, Object message) {
		try {
			return new BroadcastAction(mapper.writeValueAsString(message));
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new BroadcastAction(ACTION.ABORT, null);
		}
	}
	
}
