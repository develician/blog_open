//
//  AppDelegate.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        
        let listService = ListService()
        let reactor = ListReactor(listService: listService)
        
        let rootView = ListViewController(reactor: reactor, tag: nil, category: nil, title: "killi8n's blog")
        let rootNavi = UINavigationController(rootViewController: rootView)
        
        window = UIWindow()
        window?.rootViewController = rootNavi
        window?.makeKeyAndVisible()
        
        return true
    }



}

