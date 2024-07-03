#include <bits/stdc++.h>
using namespace std;

map<int, vector<set<int>>> adj;
map<set<int>, int> colors;
queue<set<int>> processing;
map<set<int>, int> processed;
int color;
map<int, int> acceptedAFN;
map<int, int> acceptedAFD;
map<int, map<int, int>> g; // Nuevo tipo de dato para almacenar las transiciones

void transformAFNtoADF(int node) {
    set<int> init;
    init.insert(node);
    processed[init] = 1;
    colors[init] = ++color;
    processing.push(init);

    while (!processing.empty()) {
        set<int> trans = processing.front();
        processing.pop();
        set<int> transWith0;
        set<int> transWith1;

        for (auto tran : trans) {
            transWith0.insert(adj[tran][0].begin(), adj[tran][0].end());
            transWith1.insert(adj[tran][1].begin(), adj[tran][1].end());
            //if (acceptedAFN[tran]) acceptedAFD[tran] = 1;
        }

        if (colors[transWith0] == 0) {
            color++;
            colors[transWith0] = color;
            processing.push(transWith0);
        }

        if (colors[transWith1] == 0) {
            color++;
            colors[transWith1] = color;
            processing.push(transWith1);
        }
        for(auto it:transWith0) acceptedAFD[colors[transWith0]]|=acceptedAFN[it];
        for(auto it:transWith1) acceptedAFD[colors[transWith1]]|=acceptedAFN[it];
        g[colors[trans]][0] = colors[transWith0];
        g[colors[trans]][1] = colors[transWith1];
    }
}

void generateGraphvizFile(int numNodes) {
    ofstream file("graph.dot");
    if (!file.is_open()) {
        cout << "Error: No se pudo abrir el archivo graph.dot" << endl;
        return;
    }

    file << "digraph AFD {" << endl;
    file << "\tstart [shape=point]" << endl;
    file << "\tstart -> 1" << endl;
    for (int i = 1; i <= color; i++) {
        file << "\t" << i << " [shape=circle";
        if (acceptedAFD[i])
            file << ", peripheries=2";
        file << "]" << endl;
        if (g[i][0] != 0)
            file << "\t" << i << " -> " << g[i][0] << " [label=\"0\"]" << endl;
        if (g[i][1] != 0)
            file << "\t" << i << " -> " << g[i][1] << " [label=\"1\"]" << endl;
    }
    file << "}" << endl;

    file.close();
}

int main() {
    freopen("input.txt", "r", stdin);
    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < 2; j++) {
            int m;
            cin >> m;
            set<int> aux;

            for (int k = 0; k < m; k++) {
                int num;
                cin >> num;
                aux.insert(num);
            }

            adj[i].push_back(aux);
        }
    }
    int m;cin>>m;
    for(int i=1;i<=m;i++){
        int a;cin>>a;
        acceptedAFN[a]=1;
    }
    transformAFNtoADF(1);

    generateGraphvizFile(color);
    // Llamar al comando dot para generar la imagen del grafo
    system("dot -Tpng -o graph.png graph.dot");

    return 0;
}
