#include <bits/stdc++.h>
using namespace std;

map<int,vector<set<int>>>adj;
map<set<int>,int>colors;
queue<set<int>> processing;
map<set<int>,int>proseced;
int color;
map<int,int>acceptedAFN;
map<int,int>acceptedAFD;
vector<int>*g;

void transformAFNtoADF(int node){
    set<int> init;
    init.insert(node);
    proseced[init]=1;
    colors[init]=++color;
    processing.push(init);
    while(!processing.empty()){
        set<int>trans=processing.front();
        processing.pop();
        set<int>transWith0;
        set<int>transWith1;
        for(auto tran:trans){
            transWith0.insert(adj[tran][0].begin(),adj[tran][0].end());
            transWith1.insert(adj[tran][1].begin(),adj[tran][1].end());
            if(acceptedAFN[tran])acceptedAFD[tran]=1;
        }
        if(colors[transWith0]==0){color++;colors[transWith0]=color;}
        if(colors[transWith1]==0){color++;colors[transWith1]=color;}
        g[colors[trans]]={colors[transWith0],colors[transWith1]};
        if(proseced[transWith0]==0){
            proseced[transWith0]=1;
            processing.push(transWith0);
        }
        if(proseced[transWith1]==0){
            proseced[transWith1]=1;
            processing.push(transWith1);
        }        
    }
}
int main(){
    freopen("input.txt","r",stdin);
    int n;cin>>n;
    for(int i=1;i<=n;i++){
        for(int j=0;j<2;j++){
            int m;cin>>m;
            set<int>aux;
            for(int k=0;k<m;k++){
                int num;cin>>num;
                aux.insert(num);
            }
            adj[i].push_back(aux);
        }
    }
    g=new vector<int>[n+1000];
    transformAFNtoADF(1);
    for(int i=1;i<=color;i++){
        cout<<"Nodo "<<i<<" ";
        cout<<"0 1"<<endl;
        cout<<g[i][0]<<" "<<g[i][1]<<endl;
    }
}


