import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WritingTips() {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Dicas para Escrita
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li>• Escreva livremente, sem julgamentos</li>
          <li>• Seja honesto com seus sentimentos</li>
          <li>• Inclua detalhes específicos do seu dia</li>
          <li>• Reflita sobre o que aprendeu hoje</li>
          <li>• Registre seus objetivos e sonhos</li>
        </ul>
      </CardContent>
    </Card>
  );
}
