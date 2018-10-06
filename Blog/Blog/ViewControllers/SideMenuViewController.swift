//
//  SideMenuViewController.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import UIKit
//import ReactorKit
import RxSwift
import RxCocoa
import RxViewController
import ReusableKit
import RxDataSources

class SideMenuViewController: BaseViewController {
//    typealias Reactor = SideMenuReactor
    
    var categoryService: CategoryServiceType = CategoryService()
    
    var dataSource: BehaviorRelay<[Model.Category]> = BehaviorRelay(value: [])
    
    struct Reusable {
        static let sideMenuCell = ReusableCell<SideMenuCell>()
    }
    
    lazy var tableView = UITableView().then {
        $0.backgroundColor = .white
        $0.register(Reusable.sideMenuCell)
        $0.delegate = self
        $0.dataSource = self
        $0.tableFooterView = UIView()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.view.backgroundColor = .white
        self.navigationController?.isNavigationBarHidden = true
        
        self.view.addSubview(self.tableView)
        
        self.bind()
        
    }
    
    override func setupConstraints() {
        self.tableView.snp.makeConstraints { (make) in
            make.left.equalToSuperview()
            make.top.equalToSuperview()
            make.bottom.equalToSuperview()
            make.right.equalToSuperview()
        }
    }
    
    func bind() {
        
        self.categoryService.getList().flatMap { (categories: [Model.Category]) -> Observable<[Model.Category]> in
            return Observable.just(categories)
            }.bind(to: self.dataSource).disposed(by: self.disposeBag)
        
        
//        self.rx.viewWillAppear.map { _ in Reactor.Action.getList }
//            .bind(to: reactor.action)
//            .disposed(by: self.disposeBag)
        
//        reactor.state.map { $0.sections }
//            .bind(to: self.tableView.rx.items(dataSource: self.createDataSource()))
//            .disposed(by: self.disposeBag)
        
    }
    
//    func createDataSource() -> CategoryDataSource {
//        return CategoryDataSource(configureCell: { (dataSource, tableView, indexPath, category) -> UITableViewCell in
//            let cell = tableView.dequeue(Reusable.sideMenuCell, for: indexPath)
//            cell.sideMenuLabel.text = category.category
//            return cell
//        })
//    }
    
    
    
    
}


extension SideMenuViewController: UITableViewDelegate, UITableViewDataSource {
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.dataSource.value.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeue(Reusable.sideMenuCell, for: indexPath)
        let target = self.dataSource.value[indexPath.item]
        cell.sideMenuLabel.text = target.category
        
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 50
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
       
        let listService = ListService()
        let reactor = ListReactor(listService: listService)
        let target = self.dataSource.value[indexPath.item]
        let category = target.category
        let categoryView = ListViewController(reactor: reactor, tag: nil, category: category, title: category)
        guard let rootNavi = App.delegate.window?.rootViewController as? UINavigationController else { return }
        rootNavi.pushViewController(categoryView, animated: true)
        self.dismiss(animated: true, completion: nil)
    }
}









