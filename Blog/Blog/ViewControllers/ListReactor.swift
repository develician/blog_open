//
//  ListReactor.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 3..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import ReactorKit
import RxSwift
import RxCocoa

class ListReactor: Reactor {
    
    init(listService: ListServiceType) {
        self.initialState = State()
        self.listService = listService
    }
    
    enum Action {
        case loadMore(tag: String?, category: String?)
        case refresh(tag: String?, category: String?)
        case defaultAction
    }
    
    struct State {
        var page: Int = 1
        var tag: String? = nil
        var category: String? = nil
        var isLoading: Bool = true
        var isRefreshing: Bool = false
        var sections: [PostSectionModel] = []
        var lastPage: Int? = nil
    }
    
    enum Mutation {
        case setList([Model.Post], Int)
        case addList([Model.Post], Int)
        case setLoading(Bool)
        case setRefeshing(Bool)
        case defaultMutation
    }
    
    var initialState: State
    var listService: ListServiceType
    
    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case let .refresh(tag, category):
            let refreshObservable = self.listService.getList(page: 1, tag: tag, category: category)
                .retry(1)
                .flatMap({ (posts, lastPage) -> Observable<Mutation> in
                    return Observable.just(Mutation.setList(posts, lastPage))
                })
            return Observable.concat([
                    Observable.just(Mutation.setRefeshing(true)),
                    refreshObservable,
                    Observable.just(Mutation.setRefeshing(false)),
                ])
        case let .loadMore(tag, category):
            guard !self.currentState.isLoading else { return .empty() }
            guard let lastPage = self.currentState.lastPage else { return .empty() }
            if self.currentState.page >= lastPage { return .empty() }
            let startLoading = Observable<Mutation>.just(.setLoading(true))
            let endLoading = Observable<Mutation>.just(.setLoading(false))
            let getNextListObservable = self.listService.getList(page: self.currentState.page + 1, tag: tag, category: category)
                .retry(1)
                .flatMap({ (posts, lastPage) -> Observable<Mutation> in
                return Observable.just(Mutation.addList(posts, lastPage))
            })
            return Observable.concat([
                    startLoading,
                    getNextListObservable,
                    endLoading
                ])
        case .defaultAction:
            return Observable.just(Mutation.defaultMutation)
        }
    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case let .setList(postList, lastPage):
            state.sections = [PostSectionModel(model: 0, items: postList)]
            state.lastPage = lastPage
            state.page = 1
            state.isLoading = false
            return state
        case let .setLoading(isLoading):
            state.isLoading = isLoading
            return state
        case let .addList(postList, lastPage):
            let sectionItems = state.sections[0].items + postList
            state.sections[0].items = sectionItems
            state.lastPage = lastPage
            state.page = state.page + 1
            return state
        case let .setRefeshing(isRefreshing):
            state.isRefreshing = isRefreshing
            return state
        case .defaultMutation:
            return state
        }
    }
    
    
}

















