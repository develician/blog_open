package com.blog.killi8n.androidblog.View.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.blog.killi8n.androidblog.R;

import java.util.ArrayList;
import java.util.List;

import com.blog.killi8n.androidblog.Model.Post;

public class PostListViewAdapter extends BaseAdapter {
    private LayoutInflater inflater;
    private List<Post> data;
    private int layout;

    public PostListViewAdapter(Context context, List<Post> data, int layout) {
        this.inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        this.data = data;
        this.layout = layout;
    }

    @Override
    public int getCount() {
        return data.size();
    }

    @Override
    public Object getItem(int i) {
        return data.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if (view == null) {
            view = inflater.inflate(layout, viewGroup, false);
        }

        Post post = data.get(i);
        TextView titleTextView = (TextView) view.findViewById(R.id.titleTextView);
        TextView bodyTextView = (TextView) view.findViewById(R.id.bodyTextView);
        TextView dateTextView = (TextView) view.findViewById(R.id.dateTextView);

        titleTextView.setText(post.getTitle());
        bodyTextView.setText(post.getBody());
        dateTextView.setText(post.getPublishedDate());
        return view;
    }

    public void addItems(List<Post> willAddList) {
        this.data.addAll(willAddList);
    }

}
