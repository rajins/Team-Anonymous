package com.angularapps.model;

import java.io.Serializable;

public class JsonData implements Serializable {

    private Object data;
    private String message;
    private boolean success;

    private JsonData(Object data, String message, boolean success) {
        this.data = data;
        this.message = message;
        this.success = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public static JsonData SUCCESS_RESPONSE() {
        return new JsonData(null, "success", true);
    }

    public static JsonData SUCCESS_RESPONSE(String message) {
        return new JsonData(null, message, true);
    }

    public static JsonData SUCCESS_RESPONSE(Object data, String message) {
        return new JsonData(data, message, true);
    }

    public static JsonData FAILURE_RESPONSE() {
        return new JsonData(null, "failure", false);
    }

    public static JsonData FAILURE_RESPONSE(String message) {
        return new JsonData(null, message, false);
    }

    public static JsonData FAILURE_RESPONSE(Object data, String message) {
        return new JsonData(data, message, false);
    }

    public JsonData withData(Object data) {
        this.setData(data);
        return this;
    }

    public JsonData withMessage(String message) {
        this.setMessage(message);
        return this;
    }
}
