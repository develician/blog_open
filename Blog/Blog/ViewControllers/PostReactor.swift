//
//  PostReactor.swift
//  Blog
//
//  Created by killi8n on 2018. 9. 3..
//  Copyright © 2018년 killi8n. All rights reserved.
//

import ReactorKit
import RxSwift


class PostReactor: Reactor {
    
    init(postService: PostServiceType) {
        self.initialState = State()
        self.postService = postService
    }
    
    enum Action {
        case getPost(id: String)
        case defaultAction
    }
    
    struct State {
        var isLoading: Bool = false
        var post: Model.Post? = nil
    }
    
    enum Mutation {
        case setPost(Model.Post)
        case setLoading(Bool)
    }

    var initialState: State
    var postService: PostServiceType

    func mutate(action: Action) -> Observable<Mutation> {
        switch action {
        case let .getPost(id):
            let getPostObservable = self.postService.readPost(id: id)
                .retry(1)
                .flatMap({ (post: Model.Post) -> Observable<Mutation> in
                return Observable.just(Mutation.setPost(post))
            })
            return Observable.concat([
                    Observable.just(Mutation.setLoading(true)),
                    getPostObservable,
                    Observable.just(Mutation.setLoading(false)),
                ])
        case .defaultAction:
            return Observable.empty()
        }
    }

    func reduce(state: State, mutation: Mutation) -> State {
        var state = state
        switch mutation {
        case let .setPost(post):
            state.post = post
            return state
        case let .setLoading(isLoading):
            state.isLoading = isLoading
            return state
        }
    }

    
}
