package com.blog.killi8n.androidblog.API.Post;

import android.content.Context;

import com.blog.killi8n.androidblog.API.BaseAPI;
import com.blog.killi8n.androidblog.Model.Post;
import com.blog.killi8n.androidblog.R;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface PostAPI {
    public String baseURLString = BaseAPI.baseURLString + "/api/";

    @GET("post")
    Call<List<Post>> postList(
        @Query("page") int page,
        @Query("tag") String tag
    );

}
