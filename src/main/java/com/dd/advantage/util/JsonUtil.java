package com.dd.advantage.util;

import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;

@Component
public class JsonUtil {

	private static final Logger logger = LogManager.getLogger(JsonUtil.class);

	public ObjectMapper objMapper = new ObjectMapper();

	private final ObjectMapper objMapperWithNullFields = new ObjectMapper();

	@PostConstruct
	public void init() {
		// objMapper.getSerializationConfig().with(StdDateFormat.getBlueprintISO8601Format());
		objMapper.getSerializationConfig()
				.withPropertyInclusion(JsonInclude.Value.empty().withValueInclusion(Include.NON_NULL));
		objMapper.getSerializationConfig().with(SerializationFeature.INDENT_OUTPUT);
		objMapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
		objMapper.configure(SerializationFeature.WRITE_NULL_MAP_VALUES, false);
		// objMapper.registerModule(new CollectionWithNullsHandlingModule());

		// objMapperWithNullFields.getSerializationConfig().with(StdDateFormat.getBlueprintISO8601Format());
		objMapperWithNullFields.getDeserializationConfig().without(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
	}

	@SuppressWarnings("unchecked")
	public <T> T json2Object(String json, TypeReference<T> typeReference) throws RuntimeException {
		try {
			return (T) objMapper.readValue(json, typeReference);
		} catch (final UnrecognizedPropertyException e) {
			logger.error("Error while json conversion", e);
			throw new RuntimeException(e);
		} catch (final Exception je) {
			logger.error("Error while json conversion", je);
			throw new RuntimeException(je);
		}
	}

	public <T> T json2Object(InputStream json, final Class<T> clazz) throws RuntimeException {
		T val = null;
		try {
			val = objMapper.readValue(json, clazz);
			return val;
		} catch (final UnrecognizedPropertyException e) {
			logger.error("Error while json conversion", e);
			throw new RuntimeException(e);
		} catch (final Exception je) {
			logger.error("Error while json conversion", je);
			throw new RuntimeException(je);
		}
	}

	public <T> T json2Object(final String json, final Class<T> clazz) throws RuntimeException {
		T val = null;
		try {
			val = objMapper.readValue(json, clazz);
			return val;
		} catch (final UnrecognizedPropertyException e) {
			logger.error("Error while json conversion", e);
			throw new RuntimeException(e);
		} catch (final Exception je) {
			logger.error("Error while json conversion", je);
			throw new RuntimeException(je);
		}
	}

	public <T> T object2Type(final Object obj, final Class<T> clazz) {
		T val = null;
		try {
			val = objMapper.convertValue(obj, clazz);
		} catch (final Exception je) {
			logger.error("Error while json conversion", je);
			throw new RuntimeException(je);
		}
		return val;
	}

	public String object2Json(final Object o) {
		try {
			return objMapper.writeValueAsString(o);
		} catch (final Exception e) {
			logger.error("Error while json conversion", e);
			return null;
		}
	}

	public String object2JsonWithNullableFields(final Object o)
			throws JsonGenerationException, JsonMappingException, IOException {
		return objMapperWithNullFields.writeValueAsString(o);
	}

	@SuppressWarnings("unchecked")
	public Object jsonToObjectWithNullableFields(final String str, @SuppressWarnings("rawtypes") Class clazz)
			throws JsonGenerationException, JsonMappingException, IOException {
		return objMapperWithNullFields.readValue(str, clazz);
	}

	public String formatJson(String json) {
		try {
			return objMapper.writeValueAsString(objMapper.readValue(json, Object.class));
		} catch (Exception e) {
			logger.error("Error while json conversion", e);
		}
		return json;
	}

}
