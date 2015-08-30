package com.hhl.controller;

import com.hhl.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.util.Arrays;

/**
 * Created by hhl on 2015/8/29.
 */
@Controller
public class LoginController {

    //@RequestMapping("/login")
    public String login(User user,HttpSession session){
        if (user != null && user.getUsername() != null){
            if (user.getUsername().equals("admin")){
                user.setUrls(Arrays.asList("/manager","/admin"));
            }
            session.setAttribute("user",user);
        }
        return "menus";
    }

    //@RequestMapping("/logout")
    public String logout(User user,HttpSession session){
        session.invalidate();
        return "login";
    }


    @RequestMapping("/manager")
    public String manager(){
        return "user";
    }

    @RequestMapping("/admin")
    public String admin(){
        return "admin";
    }

    @RequestMapping(value = "/upload")
    public String upload(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request, ModelMap model) {

        System.out.println("开始");
        String path = request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();
//        String fileName = new Date().getTime()+".jpg";
        System.out.println(path);
        File targetFile = new File(path, fileName);
        if(!targetFile.exists()){
            targetFile.mkdirs();
        }

        //保存
        try {
            file.transferTo(targetFile);
        } catch (Exception e) {
            e.printStackTrace();
        }
        model.addAttribute("fileUrl", request.getContextPath()+"/upload/"+fileName);

        return "result";
    }
}
