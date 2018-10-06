//
//  SideMenuReactor.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 5..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import ReactorKit
import RxSwift

class SideMenuReactor: Reactor {
    
    init(categoryService: CategoryServiceType) {
        self.initialState = State()
        self.categoryService = categoryService
    }
    
    enum Action {
        case getList
    }
    
    struct State {
        var sections: [CategorySectionModel] = []
    }
    
    enum Mutation {
        case setList([Model.Category])
    }
        
    var initialState: State
    var categoryService: CategoryServiceType
    
    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case .getList:
            print("sidegetlist")
            return self.categoryService.getList().flatMap({ (categories: [Model.Category]) -> Observable<Mutation> in
                print("side: \(categories)")
                return Observable.just(Mutation.setList(categories))
            })
        }
    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case let .setList(categories):
            print("sidereactor: \(categories)")
            state.sections = [CategorySectionModel(model: 0, items: categories)]
            return state
        }
    }

}
