package com.blog.killi8n.androidblog.Util;

import com.blog.killi8n.androidblog.Model.Post;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class DateUtil {
    public static List<Post> modifyPostListDate(List<Post> items) throws ParseException {
        List<Post> list = items;
        for (int i = 0; i < items.size(); i++) {
            list.get(i).setPublishedDate(modifyPostDate(items.get(i).getPublishedDate()));
        }
        return list;
    }

    private static String modifyPostDate(String inputDate) throws ParseException {
        Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'").parse(inputDate);
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
}
