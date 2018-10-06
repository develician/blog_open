//
//  PostViewController.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import Down
import SnapKit
import RxCocoa
import RxSwift
import NVActivityIndicatorView
import ReactorKit
import RxViewController


class PostViewController: BaseViewController, View {
    
    var postId: String?
    
    typealias Reactor = PostReactor

    init(reactor: Reactor, title: String, postId: String) {
        super.init()
        self.reactor = reactor
        self.title = title
        self.postId = postId
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    lazy var downView = try? DownView(frame: .zero, markdownString: "")
    
    let loadingMark: NVActivityIndicatorView = NVActivityIndicatorView(frame: .zero, type: NVActivityIndicatorType.circleStrokeSpin, color:
        .black, padding: 44)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.view.backgroundColor = .white
        guard let downView = self.downView else { return }
        self.view.addSubview(downView)
        self.view.addSubview(self.loadingMark)
        
    }
    
    override func setupConstraints() {
        guard let downView = self.downView else { return }
        downView.snp.makeConstraints { (make) in
            make.top.equalToSuperview()
            make.left.equalToSuperview()
            make.bottom.equalToSuperview()
            make.right.equalToSuperview()
        }
        
        self.loadingMark.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview()
        }
    }
    
    func bind(reactor: PostReactor) {
        self.rx.viewDidLoad.map { [weak self] _ -> Reactor.Action in
            guard let `self` = self else { return Reactor.Action.defaultAction }
            guard let postId = self.postId else { return Reactor.Action.defaultAction }
            return Reactor.Action.getPost(id: postId)
        }.bind(to: reactor.action).disposed(by: self.disposeBag)
        
        reactor.state.map { $0.isLoading }
            .bind(to: self.loadingMark.rx.isAnimating)
            .disposed(by: self.disposeBag)
        
        
        reactor.state.map { $0.post }
            .subscribe(onNext: { [weak self] (post: Model.Post?) in
                guard let post = post else { return }
                self?.downView?.rx.setDownView(post: post)
            })
            .disposed(by: self.disposeBag)
    }
   
}










