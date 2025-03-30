"use strict";
var React = require("react"), rxjs = require("rxjs"), sanity = require("sanity");
const PostMessagePreviews = (props) => {
  const {
    comlink,
    refs,
    perspective
  } = props, documentPreviewStore = sanity.useDocumentPreviewStore(), schema = sanity.useSchema(), refsSubject = React.useMemo(() => new rxjs.Subject(), []), previews$ = React.useMemo(() => refsSubject.asObservable().pipe(rxjs.switchMap((refs_0) => rxjs.combineLatest(refs_0.map((ref) => {
    const draftRef = {
      ...ref,
      _id: sanity.getDraftId(ref._id)
    }, draft$ = perspective === "published" ? (
      // Don't emit if not displaying drafts
      rxjs.NEVER
    ) : documentPreviewStore.observeForPreview(draftRef, schema.get(draftRef._type)).pipe(
      // Share to prevent double subscribe in the merge
      rxjs.share(),
      // Don't emit if no snapshot is returned
      // eslint-disable-next-line max-nested-callbacks
      rxjs.skipWhile((p) => p.snapshot === null)
    ), publishedRef = {
      ...ref,
      _id: sanity.getPublishedId(ref._id)
    }, published$ = documentPreviewStore.observeForPreview(publishedRef, schema.get(publishedRef._type));
    return rxjs.merge(published$.pipe(rxjs.takeUntil(draft$)), draft$).pipe(
      // eslint-disable-next-line max-nested-callbacks
      rxjs.filter((p_0) => !!p_0.snapshot),
      // eslint-disable-next-line max-nested-callbacks
      rxjs.map((p_1) => {
        const snapshot = p_1.snapshot;
        return {
          _id: sanity.getPublishedId(snapshot._id),
          title: snapshot.title,
          subtitle: snapshot.subtitle,
          description: snapshot.description,
          imageUrl: snapshot.imageUrl
        };
      })
    );
  }))), rxjs.debounceTime(0)), [documentPreviewStore, refsSubject, schema, perspective]), lastSnapshots = React.useRef([]);
  return React.useEffect(() => {
    const sub = previews$.subscribe((snapshots) => {
      comlink.post("presentation/preview-snapshots", {
        snapshots
      }), lastSnapshots.current = snapshots;
    });
    return () => {
      sub.unsubscribe();
    };
  }, [comlink, previews$]), React.useEffect(() => comlink.on("visual-editing/preview-snapshots", () => ({
    snapshots: lastSnapshots.current
  })), [comlink]), React.useEffect(() => {
    refsSubject.next(refs);
  }, [refs, refsSubject]), null;
};
var PostMessagePreviewSnapshots = React.memo(PostMessagePreviews);
exports.default = PostMessagePreviewSnapshots;
//# sourceMappingURL=PostMessagePreviewSnapshots.js.map
