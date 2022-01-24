package com.service.gethired.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class TagRequest {
    @NotBlank
    @Size(max = 40)
    private String tag;

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
