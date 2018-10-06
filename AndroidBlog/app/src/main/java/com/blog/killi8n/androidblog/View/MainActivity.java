package com.blog.killi8n.androidblog.View;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AbsListView;
import android.widget.ListView;
import android.widget.ScrollView;
import android.widget.Toast;

import com.blog.killi8n.androidblog.API.BaseAPI;
import com.blog.killi8n.androidblog.API.Post.PostAPI;
import com.blog.killi8n.androidblog.R;
import com.blog.killi8n.androidblog.Model.Post;
import com.blog.killi8n.androidblog.Util.DateUtil;
import com.blog.killi8n.androidblog.View.Adapter.PostListViewAdapter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity implements AbsListView.OnScrollListener {

    private Retrofit retrofit;
    private PostAPI postAPI;
    private Call<List<Post>> getPostList;
    private List<Post> postList;
    private PostListViewAdapter postListViewAdapter;
    private ListView postListView;

    private int preLast;
    private int page = 1;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        postListView = (ListView) findViewById(R.id.postListView);
        postListView.setOnScrollListener(this);

        buildRetrofit();
        getPostList(page);


    }

    private void buildRetrofit() {
        retrofit = new Retrofit.Builder()
                .baseUrl(PostAPI.baseURLString)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        postAPI = retrofit.create(PostAPI.class);
    }

    private void getPostList(final int page) {

        getPostList = postAPI.postList(page, null);
        getPostList.enqueue(new Callback<List<Post>>() {
            @Override
            public void onResponse(Call<List<Post>> call, Response<List<Post>> response) {

                int statusCode = response.code();

                switch (statusCode){
                    case 200:
                        postList = response.body();
                        try {
                           postList = DateUtil.modifyPostListDate(postList);
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                        if (page == 1) {
                            postListViewAdapter = new PostListViewAdapter(MainActivity.this, postList, R.layout.post_list);
                            postListView.setAdapter(postListViewAdapter);
                        } else {
                            postListViewAdapter.addItems(postList);
                            postListViewAdapter.notifyDataSetChanged();
                        }

                }
            }

            @Override
            public void onFailure(Call<List<Post>> call, Throwable t) {

            }
        });
    }


    @Override
    public void onScrollStateChanged(AbsListView absListView, int i) {

    }

    @Override
    public void onScroll(AbsListView absListView, int firstVisibleItem, int visibleItemCount, int totalItemCount) {

        switch (absListView.getId()) {
            case R.id.postListView:
                final int lastItem = firstVisibleItem + visibleItemCount;
                if (lastItem == totalItemCount) {
                    if(preLast != lastItem) {
                        preLast = lastItem;
                        page = page + 1;
                        getPostList(page);

                    }
                }
        }
    }
}


