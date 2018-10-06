//
//  ListViewController.swift
//  Blog
//
//  Created by killi8n on 2018. 8. 12..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
import SnapKit
import RxSwift
import RxCocoa
import RxDataSources
import Alamofire
import ReactorKit
import RxViewController
import ReusableKit
import Then
import NVActivityIndicatorView

import SideMenu


class ListViewController: BaseViewController, View {

    var tag: String?
    var category: String?
    
    typealias Reactor = ListReactor
    
    struct Reusable {
        static let listCell = ReusableCell<ListCell>()
        static let loadMoreCell = ReusableView<LoadMoreCell>()
    }
    
    init(reactor: Reactor, tag: String?, category: String?, title: String?) {
        super.init()
        self.reactor = reactor
        self.tag = tag
        self.category = category
        self.title = title
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    let layout: UICollectionViewFlowLayout = UICollectionViewFlowLayout().then {
        $0.scrollDirection = .vertical
        $0.minimumLineSpacing = 32
    }
    
    lazy var collectionView = UICollectionView(frame: .zero, collectionViewLayout: self.layout).then {
        $0.register(Reusable.listCell)
        $0.register(Reusable.loadMoreCell, kind: SupplementaryViewKind.footer)
        $0.alwaysBounceVertical = true
        $0.backgroundColor = .clear
    }    
    
   
    let refreshControl: UIRefreshControl = UIRefreshControl()

    let loadingMark: NVActivityIndicatorView = NVActivityIndicatorView(frame: .zero, type: NVActivityIndicatorType.ballSpinFadeLoader, color: UIColor.black, padding: 44)
    
    let sideMenuButton: UIBarButtonItem = UIBarButtonItem(image: UIImage(named: "hamburger"), style: UIBarButtonItemStyle.plain, target: nil, action: nil)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.rightBarButtonItem = self.sideMenuButton
        self.collectionView.refreshControl = self.refreshControl
        self.view.backgroundColor = .lightGray
        self.view.addSubview(self.collectionView)
        self.view.addSubview(self.loadingMark)
        self.loadingMark.startAnimating()
        
        self.setupSideMenu()
        
        
    }
    
    override func setupConstraints() {
        self.collectionView.snp.makeConstraints { (make) in
            make.top.equalToSuperview().offset(32)
            make.left.equalToSuperview()
            make.bottom.equalToSuperview()
            make.right.equalToSuperview()
        }
        
        
        
        self.loadingMark.snp.makeConstraints { (make) in
            make.centerX.equalToSuperview()
            make.centerY.equalToSuperview()
        }
    }
    
    
    func bind(reactor: Reactor) {
        
        self.collectionView.rx.setDelegate(self).disposed(by: self.disposeBag)
        
        self.sideMenuButton.rx.tap.subscribe(onNext: { [weak self] _ in
            self?.tapSideMenu()
        }).disposed(by: self.disposeBag)
        
        self.rx.viewDidLoad.map { [weak self] _ -> Reactor.Action in
            return Reactor.Action.refresh(tag: self?.tag, category: self?.category)
            }.bind(to: reactor.action).disposed(by: self.disposeBag)
        
        self.collectionView.rx.isReachedBottom
            .map { [weak self] _ -> Reactor.Action in
                return Reactor.Action.loadMore(tag: self?.tag, category: self?.category)
            }.bind(to: reactor.action).disposed(by: self.disposeBag)
        
        self.refreshControl.rx.controlEvent(.valueChanged)
            .map { [weak self] _ -> Reactor.Action in
                return Reactor.Action.refresh(tag: self?.tag, category: self?.category)
            }.bind(to: reactor.action).disposed(by: self.disposeBag)
        
        self.collectionView.rx
            .modelSelected(PostDataSource.Section.Item.self)
            .subscribe(onNext: { [weak self] (selectedPost: Model.Post) in
                guard let `self` = self else { return }
                let posts = reactor.currentState.sections[0].items
                guard let targetIndex = posts.index(where: { (post) -> Bool in
                    return post._id == selectedPost._id
                }) else { return }
                let targetPost = posts[targetIndex]
                let postService = PostService()
                let postReactor = PostReactor(postService: postService)
                let postView = PostViewController(reactor: postReactor, title: targetPost.title, postId: targetPost._id)
                self.navigationController?.pushViewController(postView, animated: true)
            })
            .disposed(by: self.disposeBag)
        
        reactor.state.map { $0.sections }
            .bind(to: self.collectionView.rx.items(dataSource: self.createDataSource()))
            .disposed(by: self.disposeBag)
        
        reactor.state.map { $0.isRefreshing }
            .distinctUntilChanged()
            .bind(to: self.refreshControl.rx.isRefreshing)
            .disposed(by: self.disposeBag)
        
        reactor.state.map { $0.isLoading }
            .flatMap({ (isLoading) -> Observable<Bool> in
                return Observable.just(isLoading && reactor.currentState.sections.count == 0)
            })
            .bind(to: self.loadingMark.rx.isAnimating)
            .disposed(by: self.disposeBag)
        
        

    }
    
    func createDataSource() -> PostDataSource {
        return PostDataSource(configureCell: { (dataSource, collectionView, indexPath, post) -> UICollectionViewCell in
            if indexPath.section == 0 {
                let cell = collectionView.dequeue(Reusable.listCell, for: indexPath)
                cell.update(data: post)
//                cell.tagCollectionView.delegate = self
//                cell.tagCollectionView.dataSource = self
                return cell
            }
            return UICollectionViewCell()
        }, configureSupplementaryView: { [weak self] (dataSource, collectionView, kind, indexPath) -> UICollectionReusableView in
            switch kind {
            case UICollectionElementKindSectionFooter:
                let footerView = collectionView.dequeue(Reusable.loadMoreCell, kind: kind, for: indexPath)
                
                guard let page = self?.reactor?.currentState.page, let lastPage = self?.reactor?.currentState.lastPage else { return UICollectionReusableView() }
                
                if page == lastPage {
                    footerView.load(false)
                } else {
                    footerView.load(true)
                }
                
                return footerView
            default:
                return UICollectionReusableView()
            }
        })
        
    }
    
    func setupSideMenu() {
        let sideMenuView = SideMenuViewController()
        let menuLeftNavigationController = UISideMenuNavigationController(rootViewController: sideMenuView)
        SideMenuManager.default.menuLeftNavigationController = menuLeftNavigationController
        
        SideMenuManager.default.menuAddPanGestureToPresent(toView: self.navigationController!.navigationBar)
        SideMenuManager.default.menuAddScreenEdgePanGesturesToPresent(toView: self.navigationController!.view)
    }
    
    @objc func tapSideMenu() {
        self.present(SideMenuManager.default.menuLeftNavigationController!, animated: true, completion: nil)

    }
    
    
}



extension ListViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, referenceSizeForFooterInSection section: Int) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: 38)
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if collectionView == self.collectionView {
            guard let targetPost = reactor?.currentState.sections[indexPath.section].items[indexPath.item] else { return CGSize(width: 0, height: 0) }
            
            let titleLabelHeight = ListCell.heightForTitleLabel(fits: collectionView.frame.width, titleText: targetPost.title)
            let bodyLabelHeight = ListCell.heightForBodyLabel(fits: collectionView.frame.width, bodyText: targetPost.body)
            
            return CGSize(width: collectionView.frame.width - 16, height: titleLabelHeight + bodyLabelHeight + 40 + 30)
        } else {
            print("HI!")
            return CGSize(width: 30, height: 30)
        }
    }
    
    
}



